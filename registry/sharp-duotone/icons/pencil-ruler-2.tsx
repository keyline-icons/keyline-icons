import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PencilRuler2({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.841 6.6614L17.3385 19.159L19.4722 21.2929C19.6597 21.4805 19.765 21.7348 19.765 22C19.765 22.5523 19.3173 23 18.765 23L2 23C1.4477 23 1 22.5523 1 22L1 5.235C1 4.6827 1.4477 4.235 2 4.235C2.2652 4.235 2.5195 4.3403 2.7071 4.5278L4.841 6.6614ZM12.8553 4.9697L10.9697 6.8553L9.5555 5.4411L11.4411 3.5555L12.8553 4.9697Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M7.9763 6.6904L7.2928 6.0067C7.1053 5.8192 7 5.5649 7 5.2997L7 4.3333C7 2.4924 8.4924 1 10.3333 1L11.2997 1C11.5649 1 11.8192 1.1053 12.0067 1.2928L12.6903 1.9762L20.5072 9.7932C20.603 9.889 20.6783 10.0032 20.7286 10.1289L22.9285 15.6286C22.9757 15.7467 23 15.8728 23 16C23 16.5523 22.5523 17 22 17C21.8728 17 21.7467 16.9757 21.6286 16.9285L16.1289 14.7286C16.0032 14.6783 15.889 14.603 15.7932 14.5072L7.9763 6.6904ZM12.8553 4.9697L11.4411 3.5555L9.5555 5.4411L10.9697 6.8553L12.8553 4.9697Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M7.2761 11.925L5.6716 13.5294L4.2574 12.1152L5.8619 10.5108L7.2761 11.925ZM12.9329 17.5818L11.3284 19.1863L9.9142 17.7721L11.5187 16.1676L12.9329 17.5818ZM10.1045 14.7534L8.5 16.3579L7.0858 14.9437L8.6903 13.3392L10.1045 14.7534Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
