import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, Form, Input } from "antd";
const { Meta } = Card;

const filterRecommendationMatrix = [
  {
    groupName: "group 1",
    ph: { start: 5.5, end: 6.8 },
    alk: { start: 0, end: 30 },
    tds: { start: 0, end: 50 },
    th: { start: 0, end: 30 },
    filters: [
      { name: "7NE", src: "../filters/filter_7NE.png" },
      { name: "4CC", src: "../filters/filter_4CC.png" },
      { name: "7CC", src: "../filters/filter_7CC.png" },
      { name: "4CB5-S", src: "../filters/filter_4CB5S.png" },
    ],
  },
  {
    groupName: "group 2",
    ph: { start: 7, end: 8.5 },
    alk: { start: 0, end: 80 },
    tds: { start: 0, end: 120 },
    th: { start: 0, end: 80 },
    filters: [
      { name: "4CB5-S", src: "../filters/filter_4CB5S.png" },
      { name: "BH2", src: "../filters/filter_BH.png" },
      { name: "MH2", src: "../filters/filter_MH.png" },
    ],
  },
  {
    groupName: "group 3",
    ph: { start: 8.5, end: 9.5 },
    alk: { start: 80, end: 150 },
    tds: { start: 0, end: 200 },
    th: { start: 80, end: 150 },
    filters: [
      { name: "Claris", src: "../filters/filter_CLARIS.png" },
      { name: "Claris Ultra", src: "../filters/filter_CLARIS.png" },
      { name: "Claris Prime", src: "../filters/filter_CLARIS.png" },
    ],
  },
  {
    groupName: "group 4",
    ph: { start: 7, end: 9.5 },
    alk: { start: 150, end: 350 },
    tds: { start: 200, end: 450 },
    th: { start: 150, end: 400 },
    filters: [
      { name: "Claris Ultra", src: "../filters/filter_CLARIS.png" },
      { name: "Claris Prime", src: "../filters/filter_CLARIS.png" },
      { name: "Euroc", src: "../filters/filter_EUROC.png" },
      { name: "Conserv RO", src: "../filters/filter_CONSERV.png" },
      { name: "MRS 600 HEII", src: "../filters/filter_MRS600.png" },
      { name: "Plate Mount (RO)", src: "../filters/filter_CLARIS.png" },
    ],
  },
];

const findRecommendation = (recommendForm) => {
  const isMatch = (currentValue) => currentValue === true;
  let solution = [];
  filterRecommendationMatrix.forEach((g) => {
    let matches = [];
    if (recommendForm.ph >= g.ph.start && recommendForm.ph <= g.ph.end) {
      matches.push(true);
    } else {
      matches.push(false);
    }
    if (recommendForm.alk >= g.alk.start && recommendForm.alk <= g.alk.end) {
      matches.push(true);
    } else {
      matches.push(false);
    }
    if (recommendForm.tds >= g.tds.start && recommendForm.tds <= g.tds.end) {
      matches.push(true);
    } else {
      matches.push(false);
    }
    if (recommendForm.th >= g.th.start && recommendForm.th <= g.th.end) {
      matches.push(true);
    } else {
      matches.push(false);
    }
    if (matches.every(isMatch)) {
      solution = g.filters;
    }
  });
  const solutionAvailable = solution.length > 0;

  return { solution, solutionAvailable };
};

const DisplayFilters = ({ filters }) => {
  return (
    <div className="displayFilters" id="resultsContainer">
      {filters.map((f) => {
        return (
          <Card key={f.name} hoverable className="image-card">
            <img src={f.src} alt="Ideal filter" />
            <Meta title={f.name} description="" />
          </Card>
        );
      })}
    </div>
  );
};

const DisplayNoMatch = () => {
  const { origin } = window.location;
  return (
    <div className="displaySuggestions" id="resultsContainer">
      <h3>
        No filters recommended yet. Try using the
        following parameters as examples:
      </h3>
      <br></br>
      <ul>
        <li>
          <a href={`${origin}?ph=6&alk=29&tds=12&th=20`}>
            Solution One
          </a>
        </li>
        <li>
          <a href={`${origin}?ph=7&alk=70&tds=100&th=75`}>
          Solution Two
          </a>
        </li>
        <li>
          <a href={`${origin}?ph=9&alk=100&tds=150&th=140`}>
          Solution Three
          </a>
        </li>
        <li>
          <a href={`${origin}?ph=9&alk=300&tds=400&th=300`}>
          Solution Four
          </a>
        </li>
      </ul>
    </div>
  );
};

export const Recommend = ({ queryParams }) => {
  const [ph, setPh] = useState(queryParams.ph);
  const [alk, setAlk] = useState(queryParams.alk);
  const [tds, setTds] = useState(queryParams.tds);
  const [th, setTh] = useState(queryParams.th);
  const [filters, setFilters] = useState([]);
  const [recommendationAvailable, setRecommendationAvailable] = useState(false);

  useEffect(() => {
    const calculateRecommendation = () => {
        const recommendForm = {
          ph: parseInt(ph),
          alk: parseInt(alk),
          tds: parseInt(tds),
          th: parseInt(th),
        };
        const { solution, solutionAvailable } = findRecommendation(recommendForm);
        setFilters(solution);
        setRecommendationAvailable(solutionAvailable);
      };
      calculateRecommendation()
  } ,[ph, alk, tds, th])

  return (
    <div className="recommend">
      <div className="recommend-background">
        <div className="recommend-container">
          <Form className="recommend-form" style={{ maxWidth: "400px" }}>
            <h3>Enter Water Analysis</h3>
            <br />
            <Form.Item required>
              <label>pH</label>
              <Input
                type="number"
                max="14"
                onChange={(e) => setPh(e.target.value)}
                value={ph}
              />
            </Form.Item>
            <Form.Item required>
              <label>Alkalinity</label>
              <Input
                type="text"
                onChange={(e) => setAlk(e.target.value)}
                value={alk}
              />
            </Form.Item>
            <Form.Item required>
              <label>TDS</label>
              <Input
                type="text"
                onChange={(e) => setTds(e.target.value)}
                value={tds}
              />
            </Form.Item>
            <Form.Item required>
              <label>Total Hardness</label>
              <Input
                type="text"
                onChange={(e) => setTh(e.target.value)}
                value={th}
              />
            </Form.Item>
          </Form>
          {recommendationAvailable ? (
            <DisplayFilters filters={filters} />
          ) : (
            <DisplayNoMatch />
          )}
        </div>
      </div>
    </div>
  );
};
