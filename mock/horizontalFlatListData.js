const HORIZON_STATUS = {
    rainy: {
        ios: "ios-rainy",
        android: "md-rainy"
    },
    cloud: {
        ios: "ios-cloudy",
        android: "md-cloudy"
    },
    thunderstorm: {
        ios: "ios-thunderstorm",
        android: "md-thunderstorm"
    },
    sunny: {
        ios: "ios-sunny",
        android: "md-sunny"
    }
};
const HORIZON_FL_DATA = [
    {
        hour: "1 AM",
        status: HORIZON_STATUS.rainy,
        degrees: 57
    },
    {
        hour: "2 AM",
        status: HORIZON_STATUS.cloud,
        degrees: 46
    },
    {
        hour: "3 AM",
        status: HORIZON_STATUS.cloud,
        degrees: 45
    },
    {
        hour: "4 AM",
        status: HORIZON_STATUS.thunderstorm,
        degrees: 60
    },
    {
        hour: "5 AM",
        status: HORIZON_STATUS.sunny,
        degrees: 62
    },
    {
        hour: "6 AM",
        status: HORIZON_STATUS.cloud,
        degrees: 55
    },
    {
        hour: "7 AM",
        status: HORIZON_STATUS.thunderstorm,
        degrees: 56
    },
    {
        hour: "8 AM",
        status: HORIZON_STATUS.cloud,
        degrees: 57
    },
    {
        hour: "9 AM",
        status: HORIZON_STATUS.sunny,
        degrees: 58
    },
    {
        hour: "10 AM",
        status: HORIZON_STATUS.sunny,
        degrees: 62
    }
];

export { HORIZON_STATUS };
export { HORIZON_FL_DATA };