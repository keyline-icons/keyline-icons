import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pentagon({ size = 24, ...props }: IconProps) {
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
      <path d="M17.3038 5.904L21.2946 9.3226C21.9155 9.8542 22.154 10.7077 21.8995 11.4841L18.906 20.6111C18.6342 21.4399 17.8607 22.0003 16.9885 22.0003L7.0114 22.0003C6.1392 22.0003 5.3657 21.4398 5.094 20.6111L2.1005 11.4842C1.8458 10.7076 2.0847 9.8541 2.7052 9.3228L10.6871 2.4852C11.4427 1.8379 12.5573 1.838 13.3129 2.4852Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3.0507 11.1725L6.0442 20.2995C6.1813 20.7176 6.5715 21.0003 7.0114 21.0003L16.9885 21.0003C17.4285 21.0003 17.8187 20.7176 17.9558 20.2995L20.9493 11.1725C21.0777 10.7808 20.9573 10.3503 20.6442 10.0822L12.6623 3.2446C12.2811 2.9181 11.7188 2.9181 11.3377 3.2446L3.3558 10.0822C3.0427 10.3503 2.9222 10.7808 3.0507 11.1725Z"/>
    </svg>
  )
}
