import React, { createContext, useState } from "react";
export const UserContext = createContext([{}, () => {}]);

export default props => {
  const [state, setState] = useState({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      personal_street_address: '',
      personal_state: '',
      personal_city: '',
      personal_postal: 0,
      personal_country: '',
      birthdate: new Date().toISOString().slice(0, 10),
      bio: "",
      website: "",
      acceptTerms: false,
      newsletter: false
    },
    errors: {}
  });
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};
