import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    // User Role
    faUserTie, faUserShield, faUserGear, faUser,
    // User Status
    faBan,
    // Category
    faQuestionCircle, faGears, faBug,
    // Status
    faFolderOpen, faHourglassHalf,  faCheckCircle, 
    // Priority
    faExclamationTriangle, faFileCircleExclamation, faExclamationCircle, faFireFlameCurved, faFire,
    // extra
    faSpinner, faFireFlameSimple, faExclamation, faInfoCircle,  
    } from '@fortawesome/free-solid-svg-icons';

export default function StatusIcons({ field }) {

  const fieldIcon = (field) => {
    switch (field) {
      // User Role
      case 'superAdmin':
            return faUserTie;
      case 'admin':
            return faUserShield;
      case 'supportAgent':
            return faUserGear;
      case 'customer':
            return faUser;

      // User Status
      case 'Active':
        return faCheckCircle;
      case 'Pending':
        return faHourglassHalf;
      case 'Blocked':
        return faBan;

      // Category
      case 'General Inquiry':
        return faQuestionCircle;
      case 'Technical':
        return faGears;
      case 'Bug Report':
        return faBug;

      // Status
      case 'Open':
        return faFolderOpen;
      case 'In Progress':
        return faHourglassHalf;
      case 'Closed':
        return faCheckCircle;

      // Priority
      case 'Low':
        return faExclamationTriangle;
      case 'Medium':
        return faFileCircleExclamation;
      case 'High':
        return faExclamationCircle;
      case 'Urgent':
        return faFireFlameCurved;
      case 'Critical':
        return faFire;
    
      default:
        return '';
    }
  };

  return (
    <>
      <FontAwesomeIcon icon={fieldIcon(field)} />
    </>
  );
}
