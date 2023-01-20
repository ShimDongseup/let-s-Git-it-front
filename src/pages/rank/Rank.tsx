import React from 'react';
import TH_LIST from './thList';
import './rank.scss';

function Rank() {
  return (
    <div className="rankWrap">
      <div className="rankInner">
        <div className="rankTitle">
          <h2>TOP 100</h2>
          <button className="initialRankBtn">초기화</button>
          <select name="languageSelect" id="languageSelect" defaultValue="">
            <option value="">전체</option>
            <option value="javascript">javascript</option>
            <option value="typescript">typescript</option>
            <option value="python">python</option>
            <option value="java">java</option>
          </select>
        </div>
        <div className="rankContent">
          <table>
            <colgroup>
              <col width="90px;" />
              <col width="200px" />
              <col width="" />
              <col width="220px;" />
              <col width="130px;" />
              <col width="130px;" />
              <col width="140px" />
              <col width="130px" />
            </colgroup>
            <thead>
              <tr>
                <th>Rank</th>
                <th className="tableLeft">User name</th>
                <th />
                <th>Main language</th>
                {TH_LIST.map(th => {
                  return (
                    <th key={th.id} className="sortTh">
                      {th.title}
                      {/* <img src="./arrow.png" alt="arrow" className="arrow" /> */}
                    </th>
                  );
                })}
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td className="tableLeft">
                  {/* <img src="" alt="" /> */}
                  abc
                </td>
                <td />
                <td>javascript</td>
                <td>500</td>
                <td>999</td>
                <td>500</td>
                <td>100</td>
              </tr>
              <tr>
                <td>2</td>
                <td className="tableLeft">
                  {/* <img src="" alt="" /> */}
                  def
                </td>
                <td />
                <td>java</td>
                <td>400</td>
                <td>888</td>
                <td>400</td>
                <td>90</td>
              </tr>
              <tr>
                <td>3</td>
                <td className="tableLeft">
                  {/* <img src="" alt="" /> */}
                  ghi
                </td>
                <td />
                <td>typescript</td>
                <td>600</td>
                <td>777</td>
                <td>300</td>
                <td>80</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Rank;
