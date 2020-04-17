import React, { Component } from 'react';
import { 
    TextField, 
    Grid 
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

class CMovieForm extends Component {

    handleValueChange(event) {
        this.props.handleValueChanage(event.target.name, event.target.value);
    }

    render() {

        const { 
            releasedDate, 
            handleDateChange, 
            movieName, 
            imageLink 
        } = this.props;

        return (
            <form>
                <Grid container justify="space-around">
                    <Grid item xs={12}>
                        <TextField 
                            label="Name" 
                            fullWidth
                            value={movieName}
                            onChange={this.handleValueChange.bind(this)}
                            name="movieName"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Release Date"
                                format="MM/dd/yyyy"
                                value={releasedDate}
                                onChange={handleDateChange}
                                fullWidth
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="standard-multiline-static"
                            label="Image Link"
                            multiline
                            rows={4}
                            fullWidth
                            value={imageLink}
                            onChange={this.handleValueChange.bind(this)}
                            name="imageLink"
                        />
                    </Grid>
                </Grid>
                
            </form>
        );
    }
}

export default CMovieForm;