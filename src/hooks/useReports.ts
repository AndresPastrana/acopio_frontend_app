import { Report } from "./../types";
import { toast } from "sonner";
import { ReportService } from "../services";
import { useSpecialistStore } from "../store/index";
import useAuth from "./useAuth";

const useReports = () => {
  const { loggedUser } = useAuth();

  const { reports, setReports, addReport, updateReport, deleteReport } =
    useSpecialistStore(
      ({ reports, setReports, addReport, updateReport, deleteReport }) => ({
        reports,
        setReports,
        addReport,
        updateReport,
        deleteReport,
      })
    );

  const loadReports = async () => {
    try {
      const loadedReports = await ReportService.getAllReports({
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (loadedReports) {
        setReports(loadedReports);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const insertReportAPI = async (report: Report) => {
    try {
      const newReport = await ReportService.createNewReport(report, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (newReport) {
        addReport(newReport);
        return toast.success(
          `Report: ${report.type_milk} inserted successfully`
        );
      } else {
        return toast.error("Error inserting report");
      }
    } catch (error) {
      return toast.error("Error inserting report");
    }
  };

  const updateReportAPI = async (report: Report) => {
    try {
      const updatedReport = await ReportService.updateReport(report, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (updatedReport) {
        updateReport(updatedReport);
        return toast.success(
          `Report: ${report.type_milk} updated successfully`
        );
      } else {
        return toast.error("Error updating report");
      }
    } catch (error) {
      return toast.error("Error updating report");
    }
  };

  const removeReportAPI = async (reportId: string) => {
    try {
      const deletedReport = await ReportService.deleteReportById(reportId, {
        headers: {
          Authorization: `Bearer ${loggedUser?.access_token}`,
        },
      });
      if (deletedReport) {
        deleteReport(deletedReport._id);
        toast.success(`Report ${deletedReport.type_milk} deleted successfully`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    reports,
    loadReports,
    insertReportAPI,
    updateReportAPI,
    removeReportAPI,
  };
};

export default useReports;
