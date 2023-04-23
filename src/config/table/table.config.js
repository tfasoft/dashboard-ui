const tables = {
  services: {
    title: "List of services",
    fields: {
      name: "Service name",
      serId: "Service identifier",
      createdAt: "Created at",
    },
  },
  authLogs: {
    title: "List of authentications",
    fields: {
      _id: "Tracking code",
      "service.name": "Service",
      "user.tid": "User TID",
      createdAt: "Date",
    },
  },
};

export default tables;
