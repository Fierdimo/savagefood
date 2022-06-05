import {
  Box,
  Card,
  CardHeader,
  CardMedia,
} from "@mui/material";

export default function MenuCard({
  producto,
  setDialogMenuData,
}) {
  function funnyText(category, price) {
    switch (category) {
      case 1:
        return `🍔🍔Burger $${price} 🙀`;
      case 3:
        return `🌮🌮Tacos $${price}🤤`;
      case 2:
        return `🍕Pizza $${price}😸`;
      case 4:
        return `🥛🥛Drinks $${price}😎`;
      default:
        return `🔧🔧Sin categoría $${price}😎`;
    }
  }

  return (
    <Card
      elevation={0}
      sx={{ width: 300, height: 200 }}
      style={{
        position: "relative",
        top: "0px",
        left:'-50px',
        borderRadius: "15px 50px 30px",
        border: "1px solid #000000",
      }}
      onClick={() => setDialogMenuData({
        open:true,
        name: producto.name,
        price: producto.price,
        description: producto.description,
        image: producto.image,
        category: producto.category,
        id: producto.id,
        rating: producto.qualification,
        reviewers: producto.reviewers,
      })}
    >
      <CardMedia component="img" height="auto" image={producto.image} />
      
      <Box
        sx={{ width: 345 }}
        style={{
          clipPath: "polygon(0 54%, 29% 38%, 100% 55%, 100% 100%, 0 100%)",
          backgroundImage:
            "linear-gradient(180deg, rgba(255,106,0,1) 0%, rgba(255,213,0,1) 100%)",
          borderRadius: "25px",
          height: "80%",
          position: "absolute",
          bottom: "-4px",
          left: "-1px",
        }}
      ></Box>
      <Box style={{ position: "absolute", bottom: "-10px", left: "10px" }}>
        <CardHeader
          title={producto.name}
          titleTypographyProps={{ color: "secondary" }}
          subheader={funnyText(producto.category, producto.price)}
          subheaderTypographyProps={{ color: "secondary" }}
        />
      </Box>
    </Card>
  );
}
