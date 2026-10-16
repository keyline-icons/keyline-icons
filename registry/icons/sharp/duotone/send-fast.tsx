import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function SendFast({ size = 24, ...props }: IconProps) {
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
      <path d="M22.9589 2.2837L18.2391 18.236C18.1134 18.6608 17.7232 18.9523 17.2802 18.9523C16.9498 18.9523 16.6407 18.7891 16.4543 18.5162L12.0034 11.9966L5.4838 7.5457C5.2109 7.3593 5.0477 7.0502 5.0477 6.7198C5.0477 6.2768 5.3392 5.8866 5.764 5.7609L21.7163 1.0411C21.8084 1.0138 21.9039 1 22 1C22.5523 1 23 1.4477 23 2C23 2.0961 22.9862 2.1916 22.9589 2.2837Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M22.7071 1.2929C22.8946 1.4804 23 1.7348 23 2C23 2.0961 22.9862 2.1916 22.9589 2.2837L18.2391 18.236C18.1134 18.6608 17.7232 18.9523 17.2802 18.9523C16.9498 18.9523 16.6407 18.7891 16.4543 18.5162L12.0034 11.9966L22.7071 1.2929Z" fill="currentColor" stroke="none"/>
      <path d="M1.7071 22.2929L6.7929 17.2071M1.7071 16.2929L5.7929 12.2071M7.7071 22.2929L11.7929 18.2071" fill="none"/>
    </svg>
  )
}
