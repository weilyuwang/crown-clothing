import React from "react";
import { connect } from "react-redux";
import MenuItem from "../menu-item/menu-item.component";
import { selectDirectorySections } from "../../redux/directory/directory-selectors";
import { createStructuredSelector } from "reselect";

import { DirectoryMenuContainer } from "./directory.styles";

const Directory = ({ sections }) => (
  <DirectoryMenuContainer>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </DirectoryMenuContainer>
);

//pass state.directory.sections to prop of Directory component.
const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);
