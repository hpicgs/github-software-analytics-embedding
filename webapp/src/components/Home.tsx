import React from 'react'
import { Button } from '@mui/material'
import { Navigate } from 'react-router-dom';

export default function Home() {
    let redirect = false;
  return (
    <div>
        <Button variant="outlined"
            onClick={() => {
            redirect = true;
        }}>
            Show example commit metrics
        </Button>
        {<Navigate replace to="hpicgs/github-software-analytics-embedding/b45d39c7b9d3bed22a383a658c1c941a111d5223" />}
    </div>
  )
}
