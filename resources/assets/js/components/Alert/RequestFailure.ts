import { iError } from "../../lib/Api";
import Alert from ".";

export default function RequestFailureAlert(e: iError) {
    return Alert(`(${e.status}) ${e.error}`);
}