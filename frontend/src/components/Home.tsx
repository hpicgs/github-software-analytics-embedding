import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
        <Button variant="outlined"
            onClick={() => {
            navigate("/hpicgs/github-software-analytics-embedding/b45d39c7b9d3bed22a383a658c1c941a111d5223")
        }}>
          Show example commit metrics
        </Button>
    </div>
  )
}
