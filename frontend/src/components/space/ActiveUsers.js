import React from "react";
import { Avatar, AvatarGroup, Box, Divider, Typography } from "@mui/material";
import { HtmlTooltip } from "../MUICustom/HtmlTooltip";

export default function ActiveUsers({ activeUsers }) {
  return (
    <HtmlTooltip
      sx={{ overflow: "scroll", maxHeight: "15vw" }}
      title={
        <>
          {activeUsers.length > 0 &&
            activeUsers.map((user, index) => {
              return (
                <>
                  <Box
                    sx={{
                      mt: 1,
                      mb: 1,
                      mr: 1,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    key={user._id}
                  >
                    <Box
                      component="img"
                      src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user.name}?size=32`}
                      alt="avatar"
                      sx={{
                        height: "40px",
                        width: "40px",
                        borderRadius: 2,
                      }}
                    />
                    <Typography
                      color="text.primary"
                      sx={{ fontSize: 15, fontWeight: 700, ml: 1 }}
                    >
                      {user.name}
                    </Typography>
                  </Box>
                  {index !== activeUsers.length - 1 && (
                    <Divider
                      sx={{ backgroundColor: "text.secondary", opacity: "0.3" }}
                    />
                  )}
                </>
              );
            })}
        </>
      }
    >
      <AvatarGroup max={6}>
        {activeUsers.length > 0 &&
          activeUsers.map((user, id) => {
            return (
              <Avatar
                key={user._id}
                src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user.name}?size=32`}
              />
            );
          })}
      </AvatarGroup>
    </HtmlTooltip>
  );
}
