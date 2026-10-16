import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Broom({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.4209 10.6875C13.3999 9.91207 14.7639 9.52866 16.3427 10.251C16.3725 10.2647 16.4023 10.2794 16.4306 10.2959C17.1356 10.7073 17.6104 11.2724 17.874 11.9258C18.1309 12.5629 18.1647 13.2265 18.0947 13.8272C17.9765 14.8401 17.5476 15.8077 17.1386 16.4903C17.1401 16.8058 17.0833 17.1154 17.0214 17.3692C16.9173 17.7967 16.7528 18.2576 16.5722 18.6973C16.2129 19.5722 15.7482 20.4607 15.4257 21.0235L15.4267 21.0245C15.0626 21.6817 14.5898 22.1948 14.0068 22.5352C13.423 22.876 12.7863 23.0099 12.1484 22.9991C10.9108 22.9779 9.62249 22.4123 8.45015 21.6836C6.08194 20.2117 3.69812 17.7643 2.22847 15.9815C1.95777 15.653 1.92416 15.1888 2.14546 14.8252C2.36677 14.4617 2.79479 14.2786 3.21089 14.3682C6.2802 15.029 9.40906 13.7321 10.7988 12.8702C11.1007 12.1716 11.6343 11.3106 12.4209 10.6875Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15.9271 11.1603L21 2"/>
    </svg>
  )
}
