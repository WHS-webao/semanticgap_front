import React from "react";
import { COLUMN_COLORS } from "../constants";
import "./CategoryGrid.css";

// .env 에 설정한 베이스 URL (없을 땐 빈 문자열)
const BASE_URL = process.env.REACT_APP_BASE_URL;

/**
 * tree: {
 *   [mainCategory]: {
 *     _default?: [{ subTitle, subPath }],
 *     [midCategory]: [{ subTitle, subPath }]
 *   }
 * }
 */
export default function CategoryGrid({ tree }) {
  return (
    <div className="grid-container">
      {Object.entries(tree).map(([mainCat, midMap], idx) => {
        const color = COLUMN_COLORS[idx % COLUMN_COLORS.length];
        // mainCat 링크에 home 디렉터리 포함
        const mainPath = `${BASE_URL}/home/${mainCat}`;
        return (
          <div
            className="column"
            key={mainCat}
            style={{ "--col-color": color }}
          >
            {/* 대분류 클릭 링크 */}
            <h2 className="main-title">
              <a
                href={mainPath}
                className="main-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {mainCat.replace(/_/g, " ")}
              </a>
            </h2>

            <div className="content">
              {/* 대→소 분류 (_default) */}
              {midMap._default && midMap._default.length > 0 && (
                <ul className="sub-list">
                  {midMap._default.map(({ subTitle, subPath }) => (
                    <li key={subPath}>
                      <a
                        className="sub-link"
                        href={`${BASE_URL}/${subPath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {subTitle.replace(/_/g, " ")}
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {/* 중→소 분류 */}
              {Object.entries(midMap)
                .filter(([mid]) => mid !== "_default")
                .map(([midCat, subs]) => {
                  // midCat 링크에 home 및 mainCat 포함
                  const midPath = `${BASE_URL}/home/${mainCat}/${midCat}`;
                  return (
                    <div className="mid-block" key={midCat}>
                      <h3 className="mid-title">
                        <a
                          href={midPath}
                          className="mid-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {midCat.replace(/_/g, " ")}
                        </a>
                      </h3>
                      <ul className="sub-list">
                        {subs.map(({ subTitle, subPath }) => (
                          <li key={subPath}>
                            <a
                              className="sub-link"
                              href={`${BASE_URL}/${subPath}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {subTitle.replace(/_/g, " ")}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}