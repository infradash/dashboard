import React from 'react';
import { SchemaResolver } from 'components/schema';

export default function Accounts() {
  return <SchemaResolver initial="app/schemas/account_list.json" />;
}
