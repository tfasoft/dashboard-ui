const forms = {
  login: {
    username: {
      type: "text",
      label: "Username",
      placeholder: "Enter username",
      secure: false,
    },
    password: {
      type: "text",
      label: "Password",
      placeholder: "Enter password",
      secure: true,
    },
  },
  register: {
    name: {
      type: "text",
      label: "Name",
      placeholder: "Enter Name",
      secure: false,
    },
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter email",
      secure: false,
    },
    phoneNumber: {
      type: "text",
      label: "Phone number",
      placeholder: "Enter your phone number",
      secure: false,
    },
    username: {
      type: "text",
      label: "Username",
      placeholder: "Enter username",
      secure: false,
    },
    password: {
      type: "text",
      label: "Password",
      placeholder: "Enter password",
      secure: true,
    },
  },
  changeName: {
    name: {
      type: "text",
      label: "Name",
      placeholder: "Enter Name",
      secure: false,
    },
  },
  changeCommon: {
    email: {
      type: "text",
      label: "Email",
      placeholder: "Enter email",
      secure: false,
    },
    phoneNumber: {
      type: "text",
      label: "Phone number",
      placeholder: "Enter your phone number",
      secure: false,
    },
    username: {
      type: "text",
      label: "Username",
      placeholder: "Enter username",
      secure: false,
    },
  },
  accessToken: {
    access_token: {
      type: "text",
      label: "Access token",
      placeholder: "Here is your access token",
      secure: false,
      disabled: true,
    },
  },
  serviceType: {
    service_type: {
      type: "text",
      label: "Service type",
      placeholder: "Here is your service type",
      secure: false,
      disabled: true,
    },
  },
  changePassword: {
    currentPassword: {
      type: "text",
      label: "Current assword",
      placeholder: "Enter current password",
      secure: true,
    },
    newPassword: {
      type: "text",
      label: "New assword",
      placeholder: "Enter new password",
      secure: true,
    },
    confirmPassword: {
      type: "text",
      label: "Confirm assword",
      placeholder: "Enter confirm password",
      secure: true,
    },
  },
  deleteAcount: {
    password: {
      type: "text",
      label: "Password",
      placeholder: "Enter password",
      secure: true,
    },
    agreed: {
      type: "checkbox",
      label: "I agree with deleting my account",
    },
  },
  regenerateAccessToken: {
    password: {
      type: "text",
      label: "Password",
      placeholder: "Enter password",
      secure: true,
    },
    agreed: {
      type: "checkbox",
      label: "I agree with regenerating access token",
    },
  },
  currentCredits: {
    credits: {
      type: "text",
      label: "Credits",
      disabled: true,
    },
  },
  buyCredits: {
    credits: {
      type: "number",
      label: "Credits",
      placeholder: "Write how many credits you want",
    },
  },
};

export default forms;
