import React from 'react';
import Button from '@mui/material/Button';

import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import { saveAs } from 'file-saver';
import Papa from 'papaparse';

import { useEffect, useRef } from 'react';

//project import
import { uploadList, fetchAllRows } from '../backend';

function exportToCSV(rows) {
  // Map over rows and re-structure each row in the desired order
  const modifiedRows = rows.map(({ church, firstname, lastname, acadStat, stat, registration }) => ({
    church,
    firstname,
    lastname,
    acadStat,
    stat,
    registration
  }));

  // Convert modified rows to CSV
  const csv = Papa.unparse(modifiedRows);

  // Create a blob and save it as a CSV file
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'Attendees.csv');
}

function createData(church, firstname, lastname, acadStat, stat, regStat) {
  return { church , firstname, lastname, acadStat, stat, regStat };
}

export default function ImportExportButton() {
    const [rows, setRows] = React.useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (fileInputRef.current) {
          fileInputRef.current.addEventListener('change', handleFileChange);
        }
        return () => {
          if (fileInputRef.current) {
            fileInputRef.current.removeEventListener('change', handleFileChange);
          }
        };
      }, []);
    
      const handleFileChange = (event) => {
          const file = event.target.files[0];
          Papa.parse(file, {
            header: true,
            complete: async function(results) {
              const newRows = results.data.map((row, index) => createData(row.church, row.firstname, row.lastname, row.acadStat, row.stat, parseInt(row.regStat)));
              await uploadList(newRows);
              setRows(newRows);
              window.location.reload();
            }
          });
      };

    useEffect(() => {
        // Fetch data from Firebase
        const fetchData = async () => {
          const data = await fetchAllRows();
          setRows(data);
        };
        fetchData();
      }, []);
    
    return(
        <>
            <Button 
            disableRipple 
            onClick={() => exportToCSV(rows)} 
            variant="text" color="secondary" 
            startIcon={<FileDownloadOutlinedIcon />}>
                Export
            </Button>

            {/* <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
            <Button 
            disableRipple 
            onClick={() => fileInputRef.current.click()} 
            variant="text" 
            color="secondary" 
            startIcon={<FileUploadOutlinedIcon />}>
                Import
            </Button> */}
        </>
    )
}