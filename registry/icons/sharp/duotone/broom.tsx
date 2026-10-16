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
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.3407 10.6875C13.3197 9.91207 14.6837 9.52866 16.2625 10.251C16.2923 10.2647 16.3221 10.2794 16.3504 10.2959C17.0554 10.7073 17.5302 11.2724 17.7938 11.9258C18.0507 12.5629 18.0845 13.2265 18.0145 13.8272C17.8963 14.8401 17.4674 15.8077 17.0584 16.4903C17.0599 16.8058 17.0031 17.1154 16.9412 17.3692C16.8371 17.7967 16.6726 18.2576 16.492 18.6973C16.1327 19.5722 15.668 20.4607 15.3455 21.0235L15.3465 21.0245C14.9824 21.6817 14.5096 22.1948 13.9266 22.5352C13.3428 22.876 12.7061 23.0099 12.0682 22.9991C10.8306 22.9779 9.54229 22.4123 8.36995 21.6836C6.00174 20.2117 3.61792 17.7643 2.14827 15.9815C1.87757 15.653 1.84396 15.1888 2.06526 14.8252C2.28657 14.4617 2.71459 14.2786 3.13069 14.3682C6.2 15.029 9.32886 13.7321 10.7186 12.8702C11.0205 12.1716 11.5541 11.3106 12.3407 10.6875Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M15.8469 11.1602L21.2053 1.48438"/>
    </svg>
  )
}
