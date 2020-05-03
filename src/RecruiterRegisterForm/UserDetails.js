import React, { useContext } from "react";
//GENERAL
import { TextField, Grid } from "@material-ui/core";
import { isWidthDown } from "@material-ui/core/withWidth";
//CONTEXT
import { UserContext } from "./UserContext";
import Autocomplete from 'react-google-autocomplete';

export function handleGoogleChange (event) {
  const code = parseInt(event.address_components[7].long_name);
  const state = event.address_components[5].short_name;
  const address = event.address_components[0].long_name + ' ' + event.address_components[1].long_name;
  const country = event.address_components[6].short_name;
  const city = event.address_components[2].short_name;
  this.setState({
    "personal_street_address": address,
    "personal_city": city,
    "personal_state": state,
    "personal_postal": code,
    "personal_country": country,
  })
}

export default props => {
  const [state] = useContext(UserContext);
  const { user, errors } = state;
  const dateLimit = new Date();
  dateLimit.setFullYear(dateLimit.getFullYear() - 18);
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          placeholder='Type your first name here'
          name='first_name'
          label='First name'
          value={user.first_name}
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["first_name"]}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          placeholder='Type your last name here'
          name='last_name'
          label='Last name'
          value={user.last_name}
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["first_name"]}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          placeholder='Type your email here'
          name='email'
          label='Email'
          value={user.email}
          type='email'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["email"]}
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type='date'
          name='birthdate'
          id='birthdate'
          label='Birthdate'
          defaultValue={user.birthdate}
          helperText='You need to be at least 18 years old'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            min: "1920-01-01",
            max: dateLimit.toISOString().slice(0, 10)
          }}
          error={!!errors["birthdate"]}
          required
          fullWidth={isWidthDown("sm")}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          placeholder='Type your password here'
          name='password'
          label='Password'
          value={user.password}
          type='password'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          required
          error={!!errors["password"]}
          inputProps={{
            minLength: 6,
            maxLength: 20
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          placeholder='Re-type your password here'
          label='Password'
          name='confirmPassword'
          value={user.confirmPassword}
          type='password'
          variant='outlined'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
          error={!!errors["confirmPassword"]}
          inputProps={{
            minLength: 6,
            maxLength: 20
          }}
          required
          fullWidth
        />
      </Grid>

      <Grid item xs={12} lg={6}> 
      <Autocomplete
                  style={{width: '50%'}}
                  onPlaceSelected={(place) => {
                    console.log(place);
                    this.handleGoogleChange(place);
                  }}
                  types={['geocode', 'establishment']}
                  componentRestrictions={{country: "us"}}/>  
      </Grid>
    </Grid>
  );
};
