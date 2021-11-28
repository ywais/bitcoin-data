import DataTable from 'react-data-table-component';

function HistoryTab(props) {
  const columns = [
    {
        name: 'Date',
        selector: row => row.Date,
        sortable: true,
    },
    {
        name: 'High',
        selector: row => row.High,
        sortable: true,
    },
    {
        name: 'Low',
        selector: row => row.Low,
        sortable: true,
    },
    {
        name: 'Open',
        selector: row => row.Open,
        sortable: true,
    },
    {
        name: 'Close',
        selector: row => row.Close,
        sortable: true,
    }
  ];

  return (
    <div className='innerTab HistoryTab' style={{display: props.visibility}}>
      <DataTable
          columns={columns}
          data={props.tableData}
      />
    </div>
  );
}

export default HistoryTab;
