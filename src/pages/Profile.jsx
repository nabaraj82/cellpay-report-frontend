import Badge from "@/components/common/Badge";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import PageContainer from "@/components/common/PageContainer";
import Toast from "@/components/common/Toast";
import { useUpdateMutation } from "@/hooks/query/common/useUpdateMutation";
import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const {
    fullName,
    username,
    email,
    mobileNumber,
    roles,
    profilePicturePath,
    id,
  } = currentUser?.userDetails || {};

  const [user, setUser] = useState({
    profilePicture: null,
    previewImage:
      profilePicturePath ,
  });

  const updateMutation = useUpdateMutation(["user/update-profile-pic"], {
    onSuccess: () => {
      
    },
    onError: () => {},
  });
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      setUser((prev) => ({
        ...prev,
        profilePicture: file,
        previewImage: URL.createObjectURL(file),
      }));
    }
  };
const handleServerUpload = () => {
  if (!user.profilePicture) return;

  const formData = new FormData();
  formData.append("profilePicture", user.profilePicture);
  formData.append("id", id); 

  updateMutation.mutate(formData);
};

  return (
    <>
      <Toast />
      <PageContainer>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Content */}
            <div className="flex-1 bg-white dark:bg-gray-600 rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6">Profile</h1>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-lg"
                      src={user.previewImage}
                      alt={`${fullName}'s profile`}
                    />
                    <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                      <label
                        className="cursor-pointer"
                        aria-label="Upload profile picture"
                      >
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <div className="text-sm xl:text-lg text-gray-500 dark:text-gray-300 flex gap-1 items-center">
                    <span>Roles:</span>
                    {roles?.length > 0 ? (
                      roles.map((role) => (
                        <Badge key={role.id} badge={role.name} />
                      ))
                    ) : (
                      <span>No roles assigned</span>
                    )}
                  </div>
                </div>

                {/* Profile Details Section */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm xl:text-lg">
                    <ProfileField label="Username" value={username} />
                    <ProfileField label="Full Name" value={fullName} />
                    <ProfileField label="Email" value={email} />
                    <ProfileField label="Mobile" value={mobileNumber} />
                  </div>
                  <div className="flex justify-end">
                    <ButtonPrimary
                      type="button"
                      disabled={!user.profilePicture}
                      onClick={handleServerUpload}
                    >
                      Save
                    </ButtonPrimary>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

const ProfileField = ({ label, value }) => (
  <div>
    <label className="block font-medium text-gray-500 dark:text-gray-300">
      {label}
    </label>
    <p className="mt-1 text-gray-900 bg-gray-100 p-2 rounded">
      {value || "Not provided"}
    </p>
  </div>
);

export default Profile;
