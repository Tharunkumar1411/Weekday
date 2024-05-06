import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../store/actions/searchActions';
import CircularProgress from '@mui/material/CircularProgress';
import styles from "./index.module.scss";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function JobCard() {
  const dispatch = useDispatch();
  const jdList = useSelector(state => state.search.searchJobs.searchJobs);
  const searchFilter = useSelector(state => state.search.searchJobs.searchFilter);
  const cardDetails = (searchFilter.length) ? searchFilter : jdList
  const loading = useSelector(state => state.search.loading);
  const countRef = useRef(1)

  console.log("searchFiltersearchFilter",searchFilter)
  const handleScroll = () => {
    const len = searchFilter.length
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.documentElement.offsetHeight && searchFilter.length === 0
    ) {

      dispatch(fetchJobs(10, countRef.current));
      countRef.current = countRef.current + 1
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const CompanyDescription = ({ description }) => {
    const toggleDescription = () => {
      alert("hi")
    };

    return (
      <div style={{ position: 'relative' }}>
        <Typography variant="body2" style={{
            overflow: 'hidden',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)',
          }}>
          {`${description.slice(0, 500)}...`} 
        </Typography>
        {description.length > 500 && (
          <Button
            onClick={toggleDescription}
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: '-20px',
            }}
          >
             Show More
          </Button>
        )}
    </div>
    );
  };

  function generateRandomNumber() {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 10) + 1;
    return randomNumber;
  }

  const numCards = cardDetails.length;
  const numColumns = numCards > 2 ? 4 : (numCards === 2 ? 6 : 12); 

  return (
    <Grid container spacing={2}>
    {cardDetails.map((item, index) => (
      <Grid item key={index} xs={12} sm={6} md={numColumns}>
          <Card sx={{ maxWidth: 350, borderRadius: 5 }} variant="outlined">
            <CardContent>
              <Typography
                sx={{
                  fontSize: 10,
                  border: 'solid 0.2px #e6e6e6',
                  width: 'fit-content',
                  borderRadius: 15,
                  padding: '3px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                }}
                color="text.secondary"
                gutterBottom
              >
                 {`⏳ Posted ${generateRandomNumber()} days ago`}
              </Typography>

              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                  <img src={item.logoUrl} alt="Company Logo" style={{ width: '30px', height: '30px', marginRight: '10px', alignSelf: 'center' }} />
                  <div>
                      <h4 style={{ margin: 0, color:'#8b8b8b' }}>{item.companyName}</h4>
                      <h5 style={{ margin: 0 }}>{item.jobRole}</h5>  
                      <h6 style={{ margin: 0 }}>{item.location}</h6>
                  </div>
              </div>
              
              <div className={styles.flexRow}>
                <Typography style={{fontSize: '14px', color: '#737d8a', marginTop: '10px'}}>Estimated Salary:  ₹{item.minJdSalary ?? 0} - {item.maxJdSalary} LPA ✅
                </Typography>
              </div>
                
              <Typography style={{marginTop: '10px', fontWeight: 'bold'}}>About Company:</Typography>
              <CompanyDescription description={item.jobDetailsFromCompany} />

              <div style={{marginTop: '20px'}}>
                <Typography style={{color:'#8b8b8b', letterSpacing: '1px', fontSize: '13px', fontWeight: 600}}>Minimum Experience</Typography>
                <Typography>{item.minExp ?? 0} years</Typography>
              </div>

              <CardActions style={{backgroundColor: '#54efc3', justifyContent:'center', borderRadius: '10px', marginTop: '5px',cursor: 'pointer'}}>
                <Typography>⚡ Easy Apply</Typography>
              </CardActions>

              <CardActions style={{ backgroundColor: '#4943da', justifyContent: 'center', borderRadius: '10px', marginTop: '5px', cursor: 'pointer'}}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="https://media.licdn.com/dms/image/C4E03AQF4heSC0llsVQ/profile-displayphoto-shrink_400_400/0/1643551282913?e=1718841600&v=beta&t=0Mrzt_KLjFEo8Vs5jLeXENBtQdyE0N7jlb7CT5gQDqY" alt="Your Image" style={{ width: '20px', height: '20px', marginRight: '5px', filter: 'blur(1px)', borderRadius: 10 }} />
                  <img src="https://media.licdn.com/dms/image/D4D03AQGsnnp5ILUfcg/profile-displayphoto-shrink_800_800/0/1699863812498?e=1715212800&v=beta&t=N7vgqonNZXRi3NW9qhAV3CNU8Aa8h3HS5jXtKDtFYvE" alt="Your Image" style={{ width: '20px', height: '20px', marginRight: '5px', filter: 'blur(1px)', borderRadius: 10 }} />

                  <Typography style={{color: "#fff"}}> Unlock Referral asks</Typography>
                </div>
              </CardActions>

            </CardContent>
          </Card>
        </Grid>
      ))}
      {loading && (
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Grid>
      )}
    </Grid>
  );
}
