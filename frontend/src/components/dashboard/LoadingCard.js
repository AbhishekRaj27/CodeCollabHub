import { Card, CardActions, CardContent, Skeleton } from "@mui/material";

export default function LoadingCard() {
  return (
    <Card
      sx={{
        backgroundColor: "background.secondary",
        m: 1,
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1,
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.3)",
        minWidth: "70vw",
      }}
    >
      <CardContent>
        <Skeleton
          animation="wave"
          variant="text"
          width={500}
          sx={{ fontSize: 20, fontWeight: 700, mb: 1 }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width={400}
          sx={{ fontSize: 15, mb: 1 }}
        />
        <Skeleton
          animation="wave"
          variant="text"
          width={300}
          sx={{ fontSize: 11 }}
        />
      </CardContent>
      <CardActions>
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      </CardActions>
    </Card>
  );
}
