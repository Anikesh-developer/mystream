import { createTheme, Pagination, ThemeProvider} from '@mui/material'
import React from 'react'

const CustomPagination = ({setPage , numofPages = 10 }) => {

    const darkTheme = createTheme({
        palette:{
            mode:"dark",
        },
    });

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    }

  return (
    <div style={{width:"100%" , display:"flex" , justifyContent: "center" , marginTop: 10 , marginBottom: 10} }>
      <ThemeProvider theme={darkTheme}>
        <Pagination count={numofPages} onChange={(e) => handlePageChange(e.target.textContent)} hideNextButton hidePrevButton color='primary'/>
      </ThemeProvider>
    </div>
  )
}

export default CustomPagination
