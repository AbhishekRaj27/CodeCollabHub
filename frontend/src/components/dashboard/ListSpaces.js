import { Box } from "@mui/material";
import React from "react";
import LoadingCard from "./LoadingCard";
import SpaceCard from "./SpaceCard";

function ListSpaces({
  setMessage,
  setSuccess,
  setError,
  loggedInUser,
  listSpaces: listSpace,
  dispatch,
}) {
  return (
    <>
      <Box
        sx={{
          pl: 5,
          pr: 5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {listSpace !== undefined ? (
          listSpace.length === 0 ? (
            <>
              <Box
                component="img"
                sx={{
                  height: 500,
                  display: "block",
                  ml: "auto",
                  mr: "auto",
                  width: "50%",
                }}
                alt="No spaces found"
                src="/no_data.png"
              />
            </>
          ) : (
            <Box>
              {listSpace.map((item, id) => {
                return (
                  <SpaceCard
                    key={id}
                    item={item}
                    loggedInUser={loggedInUser}
                    setMessage={setMessage}
                    setSuccess={setSuccess}
                    setError={setError}
                    dispatch={dispatch}
                  />
                );
              })}
            </Box>
          )
        ) : (
          <LoadingCard />
        )}
      </Box>
    </>
  );
}

export default ListSpaces;
