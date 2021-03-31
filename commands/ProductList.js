import React from "react"
import { withStyles } from "@material-ui/styles";
import { withRouter } from "next/router"
import {
	Card,
	CardMedia,
	CardActionArea,
	CardActions,
	CardContent,
	Button,
	Typography,
	IconButton
} from "@material-ui/core"

import { Image } from "../../src/lib"
import DialogConfirm from "../DialogConfirm"
import { Util } from "../../src/lib"

const useStyles = theme => ({
	cardQuality: {
		position: "absolute",
		top: 0,
		right: 0,
		backgroundColor: ""
	},
  root: {
    maxWidth: "66vh",
    margin: "auto"
  },
  card: {
    maxWidth: "100%",
  },
  cardAction: {
 		display: "flex",
		justifyContent: "space-between",
    height: 65
  },
  media: {
    height: 200,
  },
  buyButton: {
    height: 36,
  },
  price: {
    color: "#ff6712",
		marginBottom: '10px'
  },
  productName: {
    fontSize: "14px",
    fontWeight: "300",
		height: '60px'
  },
  stock: {
    fontWeight: "300",
    fontSize: 12
  },
  qty: {
    fontWeight: "200",
    fontSize: 12,
    color: "#4a4a4a"
  },
  counterBtn: {
    backgroundColor: "#f4f4f4",
    color: "#7d7d7d",
    '&:hover': {
      backgroundColor: "#f4f4f4",
    }
  },
	pricePackGram: {
		 color: "#4a4a4a", fontSize: '10px',
		 ['@media (min-width:460px)']: { // eslint-disable-line no-useless-computed-key
			 fontSize: '12px'
		 },
	},
	pricePack: {
		 color: "#4a4a4a", fontSize: '10px',
		 ['@media (min-width:460px)']: { // eslint-disable-line no-useless-computed-key
			 fontSize: '12px'
		 },
	}
});

function ProductList(props) {
	const [open, setOpen] = React.useState(false)
  const {
		classes,
		product,
		idxProduct,
		isCartEmpty,
		setIsCartEmpty,
		cart,
		setCart,
		handleCarts,
		setTotalBelanja,
		totalBelanja
	} = props
	const [idxToRemove, setIdxToRemove] = React.useState("")
	const [isPurchase, setIsPurchase] = React.useState(false)
	const [count, setCount] = React.useState(1)
	const [packing, setPacking] = React.useState("Kg")
	const [tempCart, setTempCart] = React.useState({})
	const handleCount = key => {
		let { id: idTemp, commodityUnit, packaging, order, quantity } = tempCart
		switch(commodityUnit) {
			case "gram":
				switch(key) {
					case "min":
						if(order === packaging) {
							handleOpenConfirmation(idTemp)
							return
						}
						quantity = quantity - 1
						if (packaging === 0.25) {
							order = order - 0.25
						} else {
							order = order - 0.5
						}
						break;
					default:
						if (order >=  product.stock) return;
						quantity = quantity + 1
						if (packaging === 0.25) {
							order = order + 0.25
						} else {
							order = order + 0.5
						}
				}

				break;
			default:
				if (key === "min") {
					if(order === packaging) {
						handleOpenConfirmation(idTemp)
						return
					}
					quantity = quantity - 1
					order = order - 1
				} else {
					if (order >=  product.stock) return;
					quantity = quantity + 1
					order = order  + 1
				}

		}

		setTempCart({
			...tempCart,
			order,
			quantity
		})
		let tempCount = 0
		cart.map(row => {
			if (row.id === idTemp) {
				row.order = order
				row.quantity = quantity
			}
			tempCount+=(row.price * row.quantity)

			return row
		})
	 setTotalBelanja(tempCount)
	 setCart(cart)
	}

	switch(tempCart.packaging) {
		case tempCart.packaging < 1:
			setPacking((tempCart.packaging * 100) + 'gr')
		 break;
	}

	const handleOpenConfirmation = idx => {
		setIdxToRemove(idx)
		setOpen(true)
	}

	const qualityTag = value => {
		let quality = ""
		switch(value) {
			case "Fair Trade":
				quality = Image.trade
				break;
			case "Kualitas Biasa":
				quality = Image.biasa
				break;
			case "Kualitas Khusus":
				quality = Image.khusus
				break;
			case "Organik":
				quality = Image.organik
				break;
			default:
				quality = Image.pilihan
		}

		return quality
	}


	const handleBuyButton = () => {
		if(isCartEmpty)	{
			setIsCartEmpty(false)
		}

		let carts = cart
		let tempProduct = {
			stock: product.stock,
			pickupDate: product.pickupDate,
			categories: product.categories,
			quality: product.quality,
			id: product.id,
			commodityName: product.commodityName,
			price: product.price,
			commodityUnit: product.packaging < 1 ? "gram" : product.commodityUnit,
			commodityImage: product.commodityImage,
			packaging: product.packaging,
			quantity: 1,
			order: product.packaging,
		}

		if (product.id === tempProduct.id) {
			setIsPurchase(true)
			setTempCart(tempProduct)
		}

		carts.push(tempProduct)
		const tempCount = totalBelanja + product.price
		setTotalBelanja(tempCount)
		setCart(carts)
	}

	React.useEffect(() => {
		cart.map(row => {
			if(row.id === product.id) {
				setIsPurchase(true)
				setTempCart(row)
			}
		})
	}, [count])

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.commodityImage + '?w=300'}
        />
				<div className={classes.cardQuality}>
					<img src={(qualityTag(product.quality))} style={{ width: 60}}/>
				</div>
        <CardContent>
          <Typography gutterBottom variant="h6" className={classes.productName}>
            {product.commodityName}
          </Typography>
          <Typography variant="subtitle1" className={classes.price}>
            {Util.toRp(product.price)} / <span className={product.packaging < 1 ? classes.pricePackGram : classes.pricePack}>{product.packaging < 1 && product.packaging*1000+`gr` } {product.packaging >= 1 && product.packaging+product.commodityUnit}</span>
          </Typography>
          <Typography gutterBottom variant="subtitle2" className={classes.stock} color="primary">
            Stock {product.stock <= 0 ? "0" : product.stock}{' ' + product.commodityUnit}
          </Typography>
        </CardContent>
      </CardActionArea>
      {isPurchase ?
        (
          <CardActions className={classes.cardAction}>
            <img src={Image.min} style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => handleCount("min")}/>
            <Typography gutterBottom variant="h6" color="primary" style={{ marginLeft: 20, marginRight: 20 }}>
              {tempCart.quantity}
            </Typography>
            <img src={Image.add} style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => handleCount("add")}/>
          </CardActions>
        ) : (
          <CardActions className={classes.cardAction}>
            <Button
							fullWidth
              size="medium"
              color="primary"
							variant="contained"
							disabled={product.stock <= 0}
              className={classes.buyButton}
              onClick={() => handleBuyButton()}
            >
              Beli
            </Button>
          </CardActions>
        )


      }

		<DialogConfirm
			open={open}
			setOpen={setOpen}
			idxToRemove={idxToRemove}
			setCart={setCart}
			cart={cart}
			setTempCart={setTempCart}
			setIsPurchase={setIsPurchase}
			setTotalBelanja={setTotalBelanja}
		/>
    </Card >
  )
}



export default withRouter(withStyles(useStyles)(ProductList))
