import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function Show({
    imageurl,
    previousImage,
    nextImage,
    dispPrevBtn,
    dispNextBtn,
    personName,
    handleNameChange,
}) {
    return (
        <Card sx={{ maxWidth: 345 }} style={{ margin: '0 auto' }}>
            <CardMedia
                component="img"
                alt="green iguana"
                sx={{ width: 100, height: 100, objectFit: 'cover' }}
                image={'data:image/jpeg;base64,' + imageurl}
                style={{ margin: '0 auto',marginTop:"10px" }}
            />
            <CardContent style={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Enter Name
                </Typography>
                <TextField id="outlined-basic" label="Name" variant="outlined" value={personName} onChange={handleNameChange} />
            </CardContent>
            <CardActions>
                <Button variant="contained" size="medium" id='previous' onClick={previousImage} disabled={dispPrevBtn} style={{ margin: "0 auto" }}>
                    Prev
                </Button>
                <Button variant="contained" size="medium" id='next' onClick={nextImage} disabled={dispNextBtn} style={{ margin: "0 auto" }}>
                    Next
                </Button>
            </CardActions>
        </Card>
    );
}

export default Show;