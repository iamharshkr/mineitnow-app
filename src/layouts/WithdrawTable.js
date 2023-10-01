import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {DataTable} from 'react-native-paper';

const optionsPerPage = [2, 3, 4];

const WithdrawTable = ({withdraws, dataTableHeader}) => {
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, withdraws.length);

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
      {withdraws.map((user, i) => (
        <>
          <DataTable.Row key={"a"+i}>
            <DataTable.Cell key={"b"+i} textStyle={styles.tableRow}>
              {user.coins}
            </DataTable.Cell>
            <DataTable.Cell key={"c"+i} textStyle={styles.tableRow}>
              {user.type}
            </DataTable.Cell>
            <DataTable.Cell
              key={"d"+i}
              textStyle={styles.tableRow}>
              {parseFloat(user.coinValue).toFixed(8)}
            </DataTable.Cell>
            <DataTable.Cell
              key={"e"+i}
              textStyle={[
                styles.tableRow,
                user.action === 'Success' ? styles.active : styles.notActive,
              ]}>
              {user.action}
            </DataTable.Cell>
            <DataTable.Cell
              key={"f"+i}
              textStyle={styles.tableRow}>
              {new Date(user.updatedAt).toLocaleDateString()}
            </DataTable.Cell>
          </DataTable.Row>
        </>
      ))}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(withdraws.length / itemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} of ${withdraws.length}`}
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
    fontSize: 15,
    fontWeight: '800',
    color: 'gray',
  },
  tableRow: {
    fontSize: 13,
  },
  active: {
    color: '#44EE77',
  },
  notActive: {
    color: '#FB475E',
  },
});
export default WithdrawTable;
