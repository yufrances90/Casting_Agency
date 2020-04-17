import React, { Component } from 'react';

import {
    Grid,
    TextField,
    FormControl,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    Radio
} from '@material-ui/core';

class CActorForm extends Component {
    render() {

        const { 
            changeValue,
            actorName,
            age,
            imageLink,
            gender 
        } = this.props;

        return (
            <form>
                <Grid container justify="space-around">
                    <Grid item xs={12}>
                        <TextField 
                            label="Age" 
                            fullWidth
                            name="age"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={e => changeValue(e)}
                            value={age}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Name" 
                            fullWidth
                            name="actorName"
                            onChange={e => changeValue(e)}
                            value={actorName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl 
                            component="fieldset"
                            style={{
                                marginTop: '2em'
                            }}
                        >
                            <FormLabel component="legend"> Gender </FormLabel>
                            <RadioGroup 
                                aria-label="gender" 
                                name="gender" 
                                value={gender} 
                                onChange={e => changeValue(e)}
                            >
                                <FormControlLabel value="F" control={<Radio />} label="Female" />
                                <FormControlLabel value="M" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-multiline-static"
                            label="Image Link"
                            multiline
                            rows={4}
                            fullWidth
                            name="imageLink"
                            onChange={e => changeValue(e)}
                            value={imageLink}
                        />
                    </Grid>
                </Grid>
            </form>
        )
    }
}

export default CActorForm;