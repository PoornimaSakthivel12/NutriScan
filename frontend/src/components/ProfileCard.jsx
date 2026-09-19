const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
      <div className="w-16 h-16 bg-primary-green text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800">{user.name || 'User'}</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
            {user.age_group || 'Adult'}
          </span>
          {user.pregnancy_status === 'Yes' && (
            <span className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md font-medium">
              Pregnancy Mode
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
