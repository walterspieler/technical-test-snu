import React, { useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import fileDownload from "js-file-download";

import Loader from "../../components/loader";
import api from "../../services/api";
import { formatDate } from "../../utils";
import LoadingButton from "../../components/loadingButton";

ChartJS.register(...registerables);

const ActivityView = () => {
  const [activity, setActivity] = useState();
  const [project, setProject] = useState();
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const handleDownload = async (activityID, filename) => {
    try {
      setIsLoading(true);
      await api.get(`/activity/${activityID}/details`).then((res) => {
        fileDownload(res.data, filename);
      });
      setIsLoading(false);
      toast.success(`Downloaded ${filename}`);
    } catch (error) {
      toast.error(`Error: ${error.code}`);
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/activity/${id}`);
      const { data: linkedProject } = await api.get(`/project/${data.projectId}`);
      setProject(linkedProject);
      setActivity(data);
    })();
  }, []);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 3000);
    }
  }, [copied]);

  if (!activity) return <Loader />;

  return (
    <React.Fragment>
      <div className="pl-20 pt-24 pb-4 w-[98%]">
        <div className="bg-[#FFFFFF] border border-[#E5EAEF] py-3 rounded-[16px]">
          <div className="flex justify-between px-3 pb-2  border-b border-[#E5EAEF]">
            <div>
              <span className="text-[18px] text-[#212325] font-semibold">Activity details for {project.name}</span>
            </div>
            <LoadingButton
              className="ml-[10px] bg-[#17a2b8] hover:bg-[#138496] text-[1rem] text-[#fff] py-[0.375rem] px-[0.75rem] rounded-[0.25rem]"
              loading={isLoading}
              onClick={() => handleDownload(activity._id, `${project.name} - Activity.csv`)}>
              Download CSV
            </LoadingButton>
          </div>
          <ActivityDetails activity={activity} />
        </div>
      </div>
    </React.Fragment>
  );
};

const ActivityDetails = ({ activity }) => {
  return (
    <div>
      <div className="flex flex-wrap p-3">
        <div className="w-full ">
          <div className="flex gap-3">
            <div className="w-full">
              <div className="grid grid-cols-2 gap-2 p-3">
                <div>
                  <span className="w-fit text-md text-[#0C1024]">Created at : </span>
                  <span className="w-fit text-md text-[#0C1024] font-bold">{formatDate(activity.created_at) || "NC"}</span>
                </div>
                <div>
                  <span className="w-fit text-md text-[#0C1024]">Cost : </span>
                  <span className="w-fit text-md text-[#0C1024] font-bold">{activity.cost || "NC"}</span>
                </div>
                <div>
                  <span className="w-fit text-md text-[#0C1024]">User Cost Per Day: </span>
                  <span className="w-fit text-md text-[#0C1024] font-bold">{activity.userCostPerDay || "NC"}</span>
                </div>
                <div>
                  <span className="w-fit text-md text-[#0C1024]">User Sell Per Day: </span>
                  <span className="w-fit text-md text-[#0C1024] font-bold">{activity.userSellPerDay || "NC"}</span>
                </div>
                <div>
                  <span className="w-fit text-md text-[#0C1024]">User Job Title: </span>
                  <span className="w-fit text-md text-[#0C1024] font-bold">{activity.userJobTitle || "NC"}</span>
                </div>
                <div>
                  <span className="w-fit text-md text-[#0C1024]">Date: </span>
                  <span className="w-fit text-md text-[#0C1024] font-bold">{formatDate(activity.date) || "NC"}</span>
                </div>
                <div>
                  <span className="w-fit text-md text-[#0C1024]">Value: </span>
                  <span className="w-fit text-md text-[#0C1024] font-bold">{activity.value || "NC"}</span>
                </div>
                <div>
                  <span className="w-fit text-md text-[#0C1024]">Organisation: </span>
                  <span className="w-fit text-md text-[#0C1024] font-bold">{activity.organisation || "NC"}</span>
                </div>
              </div>
              <div className="border rounded-xl">
                <div className="flex border-b">
                  <div className="border-r px-3 font-bold flex-1">Date</div>
                  <div className="px-3 min-w-[100px] font-bold text-center">Days</div>
                </div>
                {activity.detail
                  ?.filter((d) => d.value > 0)
                  .map((d) => (
                    <div key={d._id} className="flex border-b last:border-0">
                      <div className="border-r px-3 py-1 bg-gray-50 flex-1">{formatDate(d.date, "dd/MM/yyyy")}</div>
                      <div className="px-3 min-w-[100px] py-1 text-center">{d.value}</div>
                    </div>
                  ))}
                <div className="flex border-b">
                  <div className="border-r px-3 font-bold flex-1">Total</div>
                  <div className="px-3 min-w-[100px] font-bold text-center">{activity.total}</div>
                </div>
              </div>
              <div className="p-3">
                <div className="w-fit text-md text-[#0C1024]">Comment: </div>
                <div className="w-fit text-md text-[#0C1024]">{activity.comment || "NC"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityView;
