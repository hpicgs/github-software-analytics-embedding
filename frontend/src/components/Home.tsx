import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getMetricCommits, RefsResponse } from '@/utils/github'
import { Endpoints } from '@octokit/types'

export default function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState<RefsResponse>();

  useEffect(() => {
    async function fetchData() {
      const data = await getMetricCommits('hpicgs', 'github-software-analytics-embedding')
      setData(data)
    }
    fetchData()
  }, [])

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
