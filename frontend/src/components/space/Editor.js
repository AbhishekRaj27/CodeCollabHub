import { useCallback, useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { Box } from "@mui/material";
import { pythonLanguage } from "@codemirror/lang-python";
import { javascriptLanguage } from "@codemirror/lang-javascript";
import { cppLanguage } from "@codemirror/lang-cpp";
import { javaLanguage } from "@codemirror/lang-java";
import { LanguageSupport } from "@codemirror/language";
import { xcodeLight, xcodeDark } from "@uiw/codemirror-theme-xcode";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { aura } from "@uiw/codemirror-theme-aura";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { tokyoNightDay } from "@uiw/codemirror-theme-tokyo-night-day";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { socket } from "../../scoket";
import ACTIONS from "../../utils/Actions";
import { useDispatch, useSelector } from "react-redux";

const languageExtensions = {
  javascript: [new LanguageSupport(javascriptLanguage)],
  python: [new LanguageSupport(pythonLanguage)],
  cpp: [new LanguageSupport(cppLanguage)],
  java: [new LanguageSupport(javaLanguage)],
};

const themeExtensions = {
  xcodeLight,
  xcodeDark,
  githubDark,
  githubLight,
  dracula,
  aura,
  tokyoNight,
  tokyoNightStorm,
  tokyoNightDay,
  vscodeDark,
};

export default function Editor({ spaceId }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.spaceReducer);
  const [pos, setPos] = useState("1:1");
  const [codeChange, setCodeChange] = useState("");

  const onChange = useCallback((value, viewUpdate) => {
    setCodeChange(viewUpdate.state.toJSON().doc);
    socket.emit(ACTIONS.CODE_CHANGE, {
      spaceId,
      change: viewUpdate.state.toJSON().doc,
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (codeChange.length > 0) {
      dispatch({
        type: "updateCurrentData",
        payload: { ...state.currentData, fileData: codeChange },
      });
    }

    // eslint-disable-next-line
  }, [codeChange]);

  useEffect(() => {
    dispatch({
      type: "updateCursorPosition",
      payload: pos,
    });

    // eslint-disable-next-line
  }, [pos]);

  return (
    <Box>
      <CodeMirror
        value={state.currentData?.fileData}
        autoFocus={true}
        onStatistics={(data) => {
          setPos(`${data.line.number}:${data.line.to - data.line.from + 1}`);
        }}
        height="calc(100vh - 128px)"
        theme={themeExtensions[state.theme]}
        extensions={[...languageExtensions[state.language]]}
        onChange={onChange}
        style={{
          fontSize: state.fontSize,
        }}
      />
    </Box>
  );
}
