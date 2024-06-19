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
   const csv = Papa.unparse(rows);
   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
   saveAs(blob, 'Attendees.csv');
}

function createData(tracking_no,church ,name, acadStat, stat, regStat) {
  return { tracking_no,church ,name, acadStat, stat, regStat };
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
              const newRows = results.data.map((row, index) => createData(index+1, row.church, row.name, row.acadStat, parseInt(row.stat), parseInt(row.regStat)));
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

            <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
            <Button 
            disableRipple 
            onClick={() => fileInputRef.current.click()} 
            variant="text" 
            color="secondary" 
            startIcon={<FileUploadOutlinedIcon />}>
                Import
            </Button>
        </>
    )
}