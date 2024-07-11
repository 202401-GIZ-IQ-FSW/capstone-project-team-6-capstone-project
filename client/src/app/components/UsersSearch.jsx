import { useState, useEffect } from 'react';


const UsersSearch = ({ onFiltersChange, loggedUserRole }) => {

  const [userRole, setUserRole] = useState({
    superAdmin: false,
    admin: false,
    supportAgent: false,
    customer: false
  });
  
  const [userGender, setUserGender] = useState({
    Male: false,
    Female: false,
    "Prefer not to disclose": false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("name");

  useEffect(() => {
    const newFilters = {
      role: Object.keys(userRole).filter(key => userRole[key]),
      gender: Object.keys(userGender).filter(key => userGender[key]),
      searchQuery,
      searchField,
    };
    // console.log("new filters", newFilters)
    onFiltersChange(newFilters);
  }, [userRole, userGender, searchQuery, searchField, onFiltersChange]);

  const handleCheckboxChange = (section, label, checked) => {
    switch (section) {
      case 'userRole':
        setUserRole(prev => ({ ...prev, [label]: checked }));
        break;
      case 'userGender':
        setUserGender(prev => ({ ...prev, [label]: checked }));
        break;
      default:
        break;
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchFieldChange = (e) => setSearchField(e.target.value);

  return (
    < >
    
      {/* Search Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Search By</h2>

        <select
          value={searchField}
          onChange={handleSearchFieldChange}
          className="w-full px-4 py-2 border rounded-md mb-2"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="username">Username</option>
          <option value="age">Age</option>
          <option value="phone">Phone</option>
          <option value="country">Country</option>
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-md"
          placeholder={`Search by ${searchField}`}
        />
      </div>
      
      {/* Divider and User Role Section */}
      <hr className="my-4 border-gray-300" />
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">User Role</h2>
        <div className="space-y-2">
          { loggedUserRole === "superAdmin" &&
            <Checkbox label="Super Admin" checked={userRole.superAdmin} onChange={(checked) => handleCheckboxChange('userRole', 'superAdmin', checked)} />}
          { loggedUserRole === "superAdmin" &&
            <Checkbox label="Admin" checked={userRole.admin} onChange={(checked) => handleCheckboxChange('userRole', 'admin', checked)} />}
          <Checkbox label="Support Agent" checked={userRole.supportAgent} onChange={(checked) => handleCheckboxChange('userRole', 'supportAgent', checked)} />
          <Checkbox label="Customer" checked={userRole.customer} onChange={(checked) => handleCheckboxChange('userRole', 'customer', checked)} />
        </div>
      </div>

      {/* Divider and User Gender Section */}
      <hr className="my-4 border-gray-300" />
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">User Gender</h2>
        <div className="space-y-2">
          <Checkbox label="Male" checked={userGender.Male} onChange={(checked) => handleCheckboxChange('userGender', 'Male', checked)} />
          <Checkbox label="Female" checked={userGender.Female} onChange={(checked) => handleCheckboxChange('userGender', 'Female', checked)} />
          <Checkbox label="Prefer not to disclose" checked={userGender["Prefer not to disclose"]} onChange={(checked) => handleCheckboxChange('userGender', 'Prefer not to disclose', checked)} />
        </div>
      </div>

    </>
  );
};

// Checkbox component
const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-blue-500"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  );
};

export default UsersSearch;
