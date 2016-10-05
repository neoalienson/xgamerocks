API calls sample
=====

Register
-----
https://neo.works:8445/register?phone=888888&country_code=852

success
-----
{
message: "User created successfully.",
user: {
id: 888888
},
success: true,
username: <combining country code and phone number>
password: <random sh1 hash>
}

fail
-----
{
message: "User was not valid",
success: false,
errors: {
cellphone: "is invalid",
message: "User was not valid"
},
cellphone: "is invalid",
error_code: "60027"
}


Verify
-----
https://neo.works:8445/verify?uid=8888888&token=000

success
-----
{
success: false
}

fail
-----
{
success: false,
message: <error meessage>
}

Video
-----