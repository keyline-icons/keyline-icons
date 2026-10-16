import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TagHorizontalStartPercent({ size = 24, ...props }: IconProps) {
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
      <path d="M19 3C21.209139 3 23 4.790861 23 7L23 17C23 19.209139 21.209139 21 19 21L10 21C9.20435 21 8.441289 20.683929 7.87868 20.12132L1.87868 14.12132C0.707107 12.949747 0.707107 11.050253 1.87868 9.87868L7.87868 3.87868C8.441289 3.316071 9.20435 3 10 3L19 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19 4L10 4C9.469567 4 8.96086 4.210712 8.585786 4.585786L2.585786 10.585786C1.804693 11.366879 1.804693 12.633121 2.585786 13.414214L8.585786 19.414214C8.96086 19.789288 9.469567 20 10 20L19 20C20.656854 20 22 18.656854 22 17L22 7C22 5.343146 20.656854 4 19 4ZM11.25 15L17.25 9"/>
      <path d="M12.75 8.5C12.75 9.3284 12.0784 10 11.25 10C10.4216 10 9.75 9.3284 9.75 8.5C9.75 7.6716 10.4216 7 11.25 7C12.0784 7 12.75 7.6716 12.75 8.5ZM18.75 15.5C18.75 16.3284 18.0784 17 17.25 17C16.4216 17 15.75 16.3284 15.75 15.5C15.75 14.6716 16.4216 14 17.25 14C18.0784 14 18.75 14.6716 18.75 15.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
