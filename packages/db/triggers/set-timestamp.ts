const NAME = 'trigger_set_timestamp';

export const triggerSetTimestampDefinition = `
  CREATE OR REPLACE FUNCTION ${NAME}()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
`;

export const createSetTimestampTrigger = (table: string): string => `
  CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON "${table}"
  FOR EACH ROW
  EXECUTE PROCEDURE ${NAME}();
`;
