import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pear({ size = 24, ...props }: IconProps) {
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
      <path d="M12 4.0004C12 2.8004 11.8 2 11 2L10 2M13.5775 4.3756C13.4919 4.6051 13.4315 4.8476 13.4 5.1C13.8775 5.6514 14.5245 6.0188 15.2302 6.1513C15.4236 6.1876 15.6214 6.2063 15.8214 6.2063C17.437 6.2063 18.7997 5.0032 19 3.4001C18.3916 2.6975 17.508 2.2939 16.5786 2.2939C15.2174 2.2939 14.0357 3.1479 13.5775 4.3756ZM15.2302 6.1513C14.9067 5.3764 14.3154 4.7487 13.5775 4.3756C13.1018 4.1351 12.5651 4.0004 12 4.0004C10.2317 4.0004 8.7411 5.3194 8.526 7.0746C8.3891 8.1921 7.879 9.2307 7.0784 10.0223C5.7484 11.3372 5 13.1298 5 15C5 18.8659 8.134 22 12 22C15.866 22 19 18.8659 19 15C19 13.1298 18.2516 11.3372 16.9216 10.0223C16.121 9.2307 15.6109 8.1921 15.474 7.0746C15.4342 6.7501 15.3508 6.4404 15.2302 6.1513Z" fill="none"/>
    </svg>
  )
}
