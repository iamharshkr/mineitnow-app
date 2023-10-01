import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {DataTable} from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const DataTableView = ({teams, dataTableHeader}) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, teams.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        {dataTableHeader.map((header) => (
          <DataTable.Title key={header.header} textStyle={styles.tableHeader}>
            {header.header}
          </DataTable.Title>
        ))}
      </DataTable.Header>
      {teams.map((user, i) => (
        <>
          <DataTable.Row key={i}>
            <DataTable.Cell key={user.name} textStyle={styles.tableRow}>
              {user.name}
            </DataTable.Cell>
            <DataTable.Cell key={i + 1}
              textStyle={[
                styles.tableRow,
                user.isActive ? styles.active : styles.notActive,
              ]}>
              {user.isActive ? 'Active' : 'Not Active'}
            </DataTable.Cell>
          </DataTable.Row>
        </>
      ))}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(teams.length / itemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} of ${teams.length}`}
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>
  );
};
const styles = StyleSheet.create({
  tableHeader: {
    fontSize: 20,
    fontWeight: '800',
    color: 'gray',
  },
  tableRow: {
    fontSize: 18,
    fontWeight: '700',
  },
  active: {
    color: '#44EE77',
  },
  notActive: {
    color: '#FB475E',
  },
});
export default DataTableView;
