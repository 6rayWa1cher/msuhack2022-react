import { Divider, Grid, IconButton, Paper, Typography } from "@mui/material";
import {
  useDocumentTitle,
  useMySnackbar,
  useParamSelector,
} from "@utils/hooks";
import React, { useCallback, useState } from "react";
import { useLoadingPlain } from "@utils/hooks";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllButtonsByOwnerThunk,
  getAllButtonsByOwnerIdSelector,
  deleteButtonThunk,
} from "@redux/buttons";
import { unwrapResult } from "@reduxjs/toolkit";
import { getSelfUserSelector } from "@redux/users/selectors";
import BigProcess from "@components/BigProcess";
import BigError from "@components/BigError";
import RefreshIcon from "@mui/icons-material/Refresh";
import Button from "@mui/material/Button";
import { ButtonEditModal } from "@pages/ButtonEdit";
import { useIntervalWhen } from "rooks";

const ButtonRow = ({ buttonId, label, press_counter, onClick }) => {
  const dispatch = useDispatch();
  const { enqueueError } = useMySnackbar();
  const handleDeleteClick = () =>
    dispatch(deleteButtonThunk({ buttonId }))
      .then(unwrapResult)
      .catch((e) => enqueueError("Возникла ошибка при удалении кнопки"));
  return (
    <TableRow
      key={buttonId}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {label}
      </TableCell>
      <TableCell align="right">{press_counter}</TableCell>
      <TableCell align="right">
        <Button variant="outlined" onClick={onClick}>
          Изменить
        </Button>
        <Button variant="outlined" color="error" onClick={handleDeleteClick}>
          Удалить
        </Button>
      </TableCell>
    </TableRow>
  );
};

const ButtonsTable = () => {
  const dispatch = useDispatch();
  const { id: userId } = useSelector(getSelfUserSelector);
  const { enqueueError } = useMySnackbar();
  const action = useCallback(
    () =>
      dispatch(getAllButtonsByOwnerThunk({ ownerId: userId })).then(
        unwrapResult
      ),
    [userId, dispatch]
  );
  const { execute, loading, error } = useLoadingPlain(action, {
    enqueue: true,
    errorToMsg: "Возникла ошибка при загрузке списка кнопок",
  });
  const buttons = useParamSelector(getAllButtonsByOwnerIdSelector, {
    ownerId: userId,
  });
  const handleClick = useCallback(() => {
    execute();
  }, [execute]);
  useIntervalWhen(execute, 2000, !loading && !error, true);
  const [buttonId, setButtonId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  let bottomContent;

  if (!!error) {
    bottomContent = <BigError />;
  }
  if (loading) {
    bottomContent = <BigProcess />;
  }

  bottomContent = (
    <TableContainer>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell align="right">Всего нажатий</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buttons.map((row) => (
            <ButtonRow
              buttonId={row.id}
              label={row.label}
              press_counter={row.press_counter}
              onClick={() => {
                setButtonId(row.id);
                setOpenModal(true);
              }}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  return (
    <>
      <IconButton onClick={handleClick}>
        <RefreshIcon />
      </IconButton>
      {bottomContent}
      <ButtonEditModal
        buttonId={buttonId}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

const MainPage = () => {
  useDocumentTitle("Главная");
  const { id: userId } = useSelector(getSelfUserSelector);
  const url = `${process.env.REACT_APP_BACKEND_URL}mts-integration/${userId}`;
  return (
    <>
      <Typography>URL сервера приложений:</Typography>
      <Typography>{url}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Typography variant="h4" sx={{ pt: 2, pl: 2 }} color="primary">
              Кнопки
            </Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <ButtonsTable />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
