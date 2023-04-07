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
  changeUsername: {
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
};

export default forms;