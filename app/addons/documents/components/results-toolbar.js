// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.
import React from 'react';
import BulkDocumentHeaderController from "../header/header";
import Stores from "../sidebar/stores";
import Components from "../../components/react-components";
import app from '../../../app';

const {BulkActionComponent} = Components;
const store = Stores.sidebarStore;

export class ResultsToolBar extends React.Component {
  shouldComponentUpdate (nextProps) {
    return nextProps.isListDeletable != undefined;
  }

  render () {
    const database = store.getDatabase();
    const {
      hasResults,
      isListDeletable,
      removeItem,
      allDocumentsSelected,
      hasSelectedItem,
      toggleSelectAll,
      isLoading
    } = this.props;

    // Determine if we need to display the bulk action selector
    let bulkAction = null;
    if ((isListDeletable && hasResults) || isLoading) {
      bulkAction = <BulkActionComponent
        removeItem={removeItem}
        isChecked={allDocumentsSelected}
        hasSelectedItem={hasSelectedItem}
        toggleSelect={toggleSelectAll}
        disabled={isLoading}
        title="Select all docs that can be..." />;
    }

    // Determine if we need to display the bulk doc header
    let bulkHeader = null;
    if (hasResults || isLoading) {
      bulkHeader = <BulkDocumentHeaderController {...this.props} />;
    }

    let createDocumentLink = null;
    if (database) {
      const safeDatabaseId = app.utils.safeURLName(database.id);
      createDocumentLink = (
        <div className="document-result-screen__toolbar-flex-container">
          <a href={`#/database/${safeDatabaseId}/new`} className="btn save document-result-screen__toolbar-create-btn btn-primary">
            Create Document
          </a>
        </div>
      );
    }

    return (
      <div className="document-result-screen__toolbar">
        {bulkAction}
        {bulkHeader}
        {createDocumentLink}
      </div>
    );
  }
};

ResultsToolBar.propTypes = {
  removeItem: React.PropTypes.func.isRequired,
  allDocumentsSelected: React.PropTypes.bool.isRequired,
  hasSelectedItem: React.PropTypes.bool.isRequired,
  toggleSelectAll: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  hasResults: React.PropTypes.bool.isRequired,
  isListDeletable: React.PropTypes.bool
};
