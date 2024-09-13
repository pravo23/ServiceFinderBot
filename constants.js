const COMMON_SERVICES = [
    'plumber', 'electrician', 'carpenter', 'painter', 'mason', 'cleaner',
    'gardener', 'mechanic', 'roofer', 'locksmith', 'pest control', 'mover',
    'handyman', 'hvac', 'appliance repair', 'dry cleaner', 'laundry', 'chef',
    'babysitter', 'dog walker', 'nanny', 'personal trainer', 'tutor', 'realtor',
    'photographer', 'massage therapist', 'hairdresser', 'makeup artist', 'auto body',
    'contractor', 'interior designer', 'exterminator', 'window cleaner', 'housekeeper',
    'security guard', 'landscaper', 'home inspector', 'plumbing', 'heating', 'cooling',
    'water damage', 'car detailing', 'roof repair', 'tile installer', 'flooring installer',
    'pest removal', 'home cleaning', 'gutter cleaning', 'siding repair', 'deck builder',
    'fence installer', 'paver', 'concrete contractor', 'snow removal', 'waste disposal',
    'yard work', 'pool cleaning', 'car repair', 'auto detailing', 'bus driver', 'truck driver',
    'web developer', 'graphic designer', 'digital marketer', 'social media manager',
    'content writer', 'event planner', 'virtual assistant', 'financial advisor'
  ];
  
  // Regular expression for city name validation
  const CITY_NAME_REGEX = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  
  module.exports = { COMMON_SERVICES, CITY_NAME_REGEX };