import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
// import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form'
// import FormInput from './CustomTextField';
import { commerce } from "../../lib/commerce";
import { Link } from 'react-router-dom';







const AddressForm = ({ checkoutToken, next }) => {
    const intialState = {
        address1: "Address",
        city: "City",
        firstName: "FirstName",
        lastName: "LastName",
        zip: 11111,
        email:"aashishsachdeva297@gmail.com"
    }
    const methods = useForm();
    const [values, setValues] = useState(intialState)
    // console.log(data)
    // const { control } = methods;
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
    // const options =shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))
    // console.log(shippingOptions)

    // console.log(countries)

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        // console.log(countries);
        setShippingCountries(countries);

        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
        // console.log(subdivisions)
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);

    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
        // console.log(options);
        setShippingOptions(options);

        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry]);
    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shippingSubdivision])




    return (
        <>

            <Typography variant="h6" gutterBottom>Shiping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...values, shippingCountry, shippingSubdivision, shippingOption }))}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                fullWidth
                                label="First Name"
                                // value={values.firstName}
                                onChange={handleInputChange}
                                required
                            />



                        </Grid>
                        <Grid item xs={12} sm={6}>



                            <TextField
                                name="lastName"
                                fullWidth
                                label="Last Name"
                                required
                                 onChange={handleInputChange}
                            />


                        </Grid>
                        <Grid item xs={12} sm={6}>



                            <TextField
                                name="address1"
                                fullWidth
                                label="Address line 1"
                                required
                                 onChange={handleInputChange}
                            />


                        </Grid>
                        <Grid item xs={12} sm={6}>



                            <TextField
                                name="city"
                                fullWidth
                                label="City"
                                required
                                 onChange={handleInputChange}
                            />


                        </Grid>
                        <Grid item xs={12} sm={6}>



                            <TextField
                                name="zip"
                                fullWidth
                                label="Zip / Postal code"
                                required
                                 onChange={handleInputChange}
                            />


                        </Grid>
                        <Grid item xs={12} sm={6}>



                            <TextField
                                name="email"
                                fullWidth
                                label="Email"
                                required
                                 onChange={handleInputChange}
                            />


                        </Grid>

                        {/* <FormInput name="firstName" label="First name" />
                        <FormInput name="lastName" label="Last name" />
                        <FormInput name="address1" label="Address line 1" />
                        <FormInput name="email" label="Email" />
                        <FormInput name="city" label="City" />
                        <FormInput name="zip" label="Zip / Postal code" /> */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {(shippingOptions) && shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
