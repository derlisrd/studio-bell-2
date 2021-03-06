import { Grid, Icon, InputAdornment, TextField,Checkbox,FormControlLabel, Typography, Tooltip, FormControl, InputLabel, Select, MenuItem, List, ListItemButton, ListItemIcon, ListItemText, Button, ListItem,  ListItemAvatar, IconButton } from "@mui/material";
import React from "react";
import NumberFormatCustom from "../../../../Components/thirty/NumberFormatCustom";
import { useProductForm } from "./ProductFormProvider";

const Precios = () => {
  const {change,formulario,changeCheck,listas,dialogs,setDialogs,cargarStock,cantidadRef,stock,borrarStock} = useProductForm();



  return (
    <Grid container spacing={2} alignItems='center' >
      <Grid item xs={12}>
        <Typography variant="button">PRECIOS</Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
            <TextField
              onChange={change}
              fullWidth
              autoFocus
              label="Costo"
              disabled={formulario.tipo_producto === "2"}
              autoComplete="off"
              name="costo_producto"
              value={formulario.costo_producto}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon style={{ color: "#ffa501" }}>attach_money</Icon>
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
              error={false}
              helperText="Costo del producto"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            <TextField
              fullWidth
              onChange={change}
              label="Precio"
              autoComplete="off"
              name="precio_producto"
              value={formulario.precio_producto}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="primary">point_of_sale</Icon>
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
              error={false}
              helperText="Precio del producto"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={3}>
            <TextField
              fullWidth
              onChange={change}
              label="Precio Mayorista"
              autoComplete="off"
              name="preciom_producto"
              value={formulario.preciom_producto}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="primary">point_of_sale</Icon>
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
              error={false}
              helperText="Precio margen descuento"
            />
          </Grid>
            {formulario.tipo_producto==="1" &&<>
          <Grid item xs={12}>
            <Typography variant="button">STOCK</Typography>
          </Grid>
          <Grid item xs={12}sm={12} md={4}>
          <TextField
              fullWidth
              inputRef={cantidadRef}
              onChange={change}
              label="Cantidad actual"
              autoComplete="off"
              name="stock_producto"
              value={formulario.stock_producto}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="secondary">inventory_2</Icon>
                  </InputAdornment>
                ),
                inputProps: { min: 0 },
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <FormControl fullWidth>
                  <InputLabel variant="outlined">Almacenado en dep??sito</InputLabel>
                  <Select name="id_deposito_producto" value={formulario.id_deposito_producto} onChange={change} 
                  >
                    {
                      listas.depositos.map((d) => (
                        <MenuItem key={d.id_deposito} value={d.id_deposito}>
                          {d.nombre_deposito}
                        </MenuItem>
                      ))
                    }
                    <List>
                      <ListItemButton onClick={()=> setDialogs({...dialogs,depositos:true})}>
                        <ListItemIcon><Icon>add</Icon></ListItemIcon>
                        <ListItemText primary="Agregar deposito" />
                      </ListItemButton>
                    </List>
                  </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Button variant="outlined" size="large" onClick={cargarStock}>Agregar stock</Button>
          </Grid>

          <Grid item xs={12}>
          <List>
            {stock.map((e, i) => (
              
              <ListItem key={i}>
                <ListItemAvatar>
                  <IconButton onClick={()=>{borrarStock(i)}}>
                    <Icon>close</Icon>
                  </IconButton>
                </ListItemAvatar>
                <ListItemText secondary={`Cantidad: ${e.stock_producto_deposito}`} primary={`${e.nombre}`} />
              </ListItem>              
            ))}
          </List>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="button">NOTIFICACION</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            
            <TextField fullWidth onChange={change} label="Stock m??nimo" autoComplete="off" name="minimo_producto"
              disabled={
                formulario.tipo_producto === "2" ||
                formulario.notificar_producto === "0"
              }
              value={formulario.minimo_producto}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="primary">inventory_2</Icon>
                  </InputAdornment>
                ),
                inputProps: { min: 0 },inputComponent: NumberFormatCustom,
              }}
              variant="outlined" error={false} helperText="Cantidad m??nima para notificar"
            />    
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Tooltip placement="top" title="Al activar, el sistema le notificara que existe un m??nimo del producto en stock">
            <FormControlLabel
              control={
                <Checkbox
                  checked={formulario.notificar_producto === "1"}
                  onChange={changeCheck}
                  name="notificar_producto"
                  color="primary"
                />
              }
              label="Notificar stock m??nimo"
            />
            </Tooltip>
          </Grid>
          </>}
          <Grid item xs={12}>
            <Typography variant="button">COMISI??N</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
          <TextField
              fullWidth onChange={change}
              label="Comisi??n en %" autoComplete="off"
              name="porcentaje_comision" value={formulario.porcentaje_comision}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon color="secondary">money</Icon>
                  </InputAdornment>
                ),
                inputProps: { min: 0, max: 100, maxLength:2},
                inputComponent: NumberFormatCustom,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <FormControl fullWidth>
              <InputLabel variant="outlined">Estado de stock</InputLabel>
              <Select
                required
                name="disponible_producto"
                value={formulario.disponible_producto}
                onChange={change}
                variant="outlined"
              >
                <MenuItem value={1}>Disponible</MenuItem>
                <MenuItem value={0}>No Disponible</MenuItem>
                </Select>
            </FormControl>
          </Grid>
    </Grid>
  );
};

export default Precios;
