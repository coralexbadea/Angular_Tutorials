// TODO Add translation support in case we don't need specific texts here

export class BatchText {
  SINGLE: string = '1 selected';
  MULTIPLE: string = '{{count}} selected';
}

export class ToolbarActionTexts {
  cancelText: { CANCEL: string } = { CANCEL: 'Cancel' };
  batchText?: string | BatchText = new BatchText();
}
