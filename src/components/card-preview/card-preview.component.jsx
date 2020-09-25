import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import CopyData from "../copy-data/copy-data.component";
import TypePreview from "../type-preview/type-preview.component";
import AdditionalInfo from "../additional-info/additional-info.component";
import { copyToClipboard } from "../utils/copyToClipboard";
import { firstCharToUpperCase } from "../utils/firstCharToUpperCase";
import { sortArrOfObj } from "../utils/sortArrOfObj";
import { POKEMON_TYPES } from "../../constants/pokemon-types";

import {
  Card,
  CardMedia,
  Typography,
  Divider,
  CardContent,
} from "@material-ui/core";

const CardPreview = ({ pokemon, additionalInfo }) => {
  const { name, id, types, base_experience, stats } = pokemon;
  const imageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
  const newStats = sortArrOfObj(stats.slice(), "base_stat");

  return (
    <Card className="card">
      <Link to={`/${id}`}>
        <CardMedia
          className="media"
          image={imageUrl}
          title={`${name}-pokemon`}
        />
      </Link>

      <CardContent className="card-content">
        <Typography align="center" gutterBottom variant="h5" color="primary">
          {name.toUpperCase()}
        </Typography>

        <Divider variant="middle" />

        <CopyData
          onCopy={() => copyToClipboard(`Base Experience: ${base_experience}`)}
        >
          Base Experience: {base_experience}
        </CopyData>

        <section className="type-stats-container">
          <ul className="text-align-left">
            {newStats
              .filter((stat, ind) => ind < 3)
              .map((stat, index) => {
                return (
                  <li key={index}>
                    <strong>
                      {`${firstCharToUpperCase(stat.stat.name)}: ${
                        stat.base_stat
                      }`}
                    </strong>
                  </li>
                );
              })}
          </ul>
        </section>
        <Divider variant="middle" />

        {additionalInfo ? <AdditionalInfo pokemon={pokemon} /> : null}

        <div className="type-container">
          {types.map((type, index) => (
            <TypePreview
              key={index}
              backgroundColor={POKEMON_TYPES[type.type.name].color}
            >
              {firstCharToUpperCase(type.type.name)}
            </TypePreview>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

CardPreview.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    base_experience: PropTypes.number.isRequired,
    stats: PropTypes.array.isRequired,
  }),
  additionalInfo: PropTypes.bool.isRequired,
};

export default CardPreview;
